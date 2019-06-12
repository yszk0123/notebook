import { Max, Min } from 'class-validator';
import {
  Arg,
  ArgsType,
  Authorized,
  buildSchema,
  Ctx,
  Field,
  ID,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { Repository } from 'typeorm';

@ObjectType()
class Note {
  @Field(type => ID)
  id: string;

  @Field()
  text: string;

  @Field()
  createdAt: Date;
}

@Resolver(of => Note)
class NoteResolver {
  constructor(private noteService: NoteService, private userRepository: Repository<User>) {}

  @Query(returns => Note)
  async note(@Arg('id') id: string) {
    const note = await this.noteService.findById(id);
    if (note === undefined) {
      throw new Error();
    }
    return note;
  }

  @Mutation(returns => Note)
  @Authorized()
  async createNote(
    @Arg('noteForCreate') note: NoteForCreateInput,
    @Ctx('user') user: User,
  ): Promise<Note> {
    return this.noteService.createNote(note, user);
  }
}

@InputType()
class NoteForCreateInput {
  @Field()
  text: string;
}

@ArgsType()
class NotesArgs {
  @Field(type => Int)
  @Min(0)
  skip: number = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}

interface NoteService {
  findById(id: string): Promise<Note | undefined>;
  findAll(): Promise<Note[]>;
  createNote(note: NoteForCreateInput, user: User): Promise<Note>;
}
interface User {}
enum Role {
  ADMIN = 'ADMIN',
}

async function main() {
  const schema = await buildSchema({
    resolvers: [NoteResolver],
  });
}

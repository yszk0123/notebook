import { isNotUndefined } from 'option-t/lib/Undefinable';
import { mapForUndefinable } from 'option-t/lib/Undefinable/map';
import { inputRules, wrappingInputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { InputRuleFactory } from '../EditorType';

const todoRule: InputRuleFactory = nodeType => {
  return wrappingInputRule(/^\s*(\[\s?\])\s$/, nodeType);
};

export function buildTodoInputRules(schema: Schema) {
  const rules = [mapForUndefinable(schema.nodes.todo, todoRule)].filter(isNotUndefined);
  return inputRules({ rules });
}

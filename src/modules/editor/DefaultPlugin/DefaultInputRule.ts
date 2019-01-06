/**
 * @see https://github.com/ProseMirror/prosemirror-example-setup/blob/b8f2f91e2bc2be4442437709cd7d48d6cd9a3302/src/inputrules.js
 */
import { isNotUndefined } from 'option-t/lib/Undefinable';
import { mapForUndefinable } from 'option-t/lib/Undefinable/map';
import {
  ellipsis,
  emDash,
  InputRule,
  inputRules,
  smartQuotes,
  textblockTypeInputRule,
  wrappingInputRule,
} from 'prosemirror-inputrules';
import { NodeType, Schema } from 'prosemirror-model';
import { InputRuleFactory } from '../EditorType';

const blockQuoteRule: InputRuleFactory = nodeType => {
  return wrappingInputRule(/^\s*>\s$/, nodeType);
};

const orderedListRule: InputRuleFactory = nodeType => {
  return wrappingInputRule(
    /^(\d+)\.\s$/,
    nodeType,
    match => ({ order: +match[1] }),
    (match, node) => node.childCount + node.attrs.order === +match[1],
  );
};

const bulletListRule: InputRuleFactory = nodeType => {
  return wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
};

const codeBlockRule: InputRuleFactory = nodeType => {
  return textblockTypeInputRule(/^```$/, nodeType);
};

function headingRule(nodeType: NodeType, maxLevel: number): InputRule {
  return textblockTypeInputRule(
    new RegExp('^(#{1,' + maxLevel + '})\\s$'),
    nodeType,
    match => ({ level: match[1].length }),
  );
}

export function buildInputRules(schema: Schema) {
  const rules = [
    ...smartQuotes.concat(ellipsis, emDash),
    mapForUndefinable(schema.nodes.blockquote, blockQuoteRule),
    mapForUndefinable(schema.nodes.ordered_list, orderedListRule),
    mapForUndefinable(schema.nodes.bullet_list, bulletListRule),
    mapForUndefinable(schema.nodes.code_block, codeBlockRule),
    mapForUndefinable(schema.nodes.heading, type => headingRule(type, 6)),
  ].filter(isNotUndefined);
  return inputRules({ rules });
}

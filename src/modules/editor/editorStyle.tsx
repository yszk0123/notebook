import { css } from '../../app/styled-components';

export const editorStyle = css`
  .ProseMirror {
    padding: 4px 8px 4px 14px;
    line-height: 1.2;

    p {
      margin: 0;
    }

    input[type='checkbox']:checked + span {
      opacity: ${({ theme }) => theme.inactiveOpacity};
      text-decoration: line-through;
    }
  }

  .ProseMirror-focused {
    outline: none;
  }
`;

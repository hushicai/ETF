import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  Suspense
} from 'react';

import { TextInput, OptionalInputProps } from './Input';
import { InputContainer } from './InputContainer';
import { findDOMNode } from 'react-dom';
import type { FundDataItem } from '../common/service';
import styled from 'styled-components';
import { fetchFundData, Resource } from '../common/resource';

const SuggestionContainer = styled(InputContainer)`
  display: block;
  position: relative;
  input {
    flex: none;
    width: 100%;
    box-sizing: border-box;
  }
`;

const List = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #eee;
  margin-top: -2px;
  box-shadow: 0 5px 8px #ddd;
  ul {
    list-style: none;
  }
  li {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #eee;
    padding: 0 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  li:hover {
    background-color: #eee;
  }
  p {
    font-size: 12px;
    color: #888;
    padding: 0.6em 1em;
  }
`;

type IOnSelect = (item: FundDataItem) => void;

const initialResource = fetchFundData('');

export function Suggestion({
  inputProps,
  onSelect
}: {
  inputProps?: OptionalInputProps;
  onSelect: IOnSelect;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [visible, setVisible] = useState(true);
  const [resource, setResource] = useState<Resource<FundDataItem[]>>(
    initialResource
  );
  const onChangeCallback = useCallback((value: string) => {
    setInputValue(value);
    const nextResource = fetchFundData(value);
    setResource(nextResource);
  }, []);

  const onSelectCallback = useCallback(
    (item) => {
      onSelect(item);
      setInputValue(item.CODE);
      setVisible(false);
    },
    [onSelect]
  );

  const onFocusCallback = useCallback(() => {
    setVisible(true);
  }, []);

  const onDocumentClick = useCallback((e) => {
    const containerNode = findDOMNode(containerRef.current);
    let node = e.target;
    let justClickedInContainer = false;

    while (node !== null && node !== document) {
      if (node === containerNode) {
        justClickedInContainer = true;
        break;
      }

      node = node.parentNode;
    }

    if (justClickedInContainer) {
      return;
    }

    // click outside container
    setVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', onDocumentClick, false);
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, [onDocumentClick]);

  return (
    <SuggestionContainer ref={containerRef}>
      <TextInput
        {...inputProps}
        value={inputValue}
        onFocus={onFocusCallback}
        onChange={onChangeCallback}
        forwardedRef={inputRef}
        id="fund-input"
      />
      <Suspense fallback={null}>
        <SuggestionList
          resource={resource}
          visible={visible}
          onSelect={onSelectCallback}
        />
      </Suspense>
    </SuggestionContainer>
  );
}

function SuggestionList({
  resource,
  visible,
  onSelect
}: {
  resource: Resource<FundDataItem[]>;
  visible: boolean;
  onSelect: IOnSelect;
}): JSX.Element | null {
  const data = resource.funds.read();
  const onClick = useCallback(
    (e) => {
      const node = e.target;
      const index = node && node.getAttribute('data-suggest-index');
      const item = data[index];
      onSelect(item);
    },
    [onSelect, data]
  );

  return visible && data.length ? (
    <List>
      <ul>
        {data.map((item, index) => {
          return (
            <li key={index} data-suggest-index={index} onClick={onClick}>
              {item.CODE} {item.NAME}
            </li>
          );
        })}
      </ul>
      <p>提示：数据来自天天基金网。</p>
    </List>
  ) : null;
}

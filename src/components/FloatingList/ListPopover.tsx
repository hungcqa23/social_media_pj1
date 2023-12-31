import {
  autoUpdate,
  flip,
  useFloating,
  useInteractions,
  useListNavigation,
  useTypeahead,
  useClick,
  useListItem,
  useDismiss,
  useRole,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal
} from '@floating-ui/react';
import classNames from 'classnames';
import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

interface SelectContextValue {
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
  handleSelect: (index: number | null) => void;
}

const SelectContext = createContext<SelectContextValue>(
  {} as SelectContextValue
);

interface Props {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: string | null;
}
export function Select({
  children,
  className,
  isOpen,
  setIsOpen,
  label
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(label);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [flip()]
  });

  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const handleSelect = useCallback(
    (index: number | null) => {
      setSelectedIndex(index);
      setIsOpen(false);
      if (index !== null) {
        setSelectedLabel(labelsRef.current[index]);
      }
    },
    [setIsOpen]
  );

  function handleTypeaheadMatch(index: number | null) {
    if (isOpen) {
      setActiveIndex(index);
    } else {
      handleSelect(index);
    }
  }

  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch: handleTypeaheadMatch
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNav, typeahead, click, dismiss, role]
  );

  const selectContext = useMemo(
    () => ({
      activeIndex,
      selectedIndex,
      getItemProps,
      handleSelect
    }),
    [activeIndex, selectedIndex, getItemProps, handleSelect]
  );

  useEffect(() => {
    setSelectedLabel(label);
  }, [label]);
  return (
    <>
      <button
        ref={refs.setReference}
        tabIndex={0}
        {...getReferenceProps()}
        className={className}
        type='button'
      >
        {selectedLabel ?? 'Selected...'}
      </button>

      <SelectContext.Provider value={selectContext}>
        {isOpen && (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                  {children}
                </FloatingList>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </SelectContext.Provider>
    </>
  );
}

export function Option({
  label,
  className = 'p-2 text-sm font-medium',
  onClick,
  isSelectedOption
}: {
  label: string;
  className?: string;
  onClick: () => void;
  isSelectedOption?: boolean;
}) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } =
    useContext(SelectContext);

  const { ref, index } = useListItem({ label });

  const isActive = isSelectedOption || activeIndex === index;
  const isSelected = selectedIndex === index;
  // Kiểm tra prop isSelectedOption để xác định liệu option có được chọn hay không
  const finalIsSelected = isSelectedOption || isSelected;
  return (
    <button
      ref={ref}
      role='option'
      aria-selected={isActive && finalIsSelected}
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        onClick: () => {
          onClick();
          handleSelect(index);
        }
      })}
      className={classNames(className, {
        'bg-gray-200': isActive,
        'font-bold': isSelected
      })}
      type='button'
    >
      {label}
    </button>
  );
}

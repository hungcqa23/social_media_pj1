import {
  shift,
  useFloating,
  flip,
  FloatingPortal,
  type Placement,
  arrow,
  FloatingArrow,
  autoUpdate,
  useClick,
  useInteractions,
  offset
} from '@floating-ui/react';
// import { motion } from 'framer-motion';
import { ElementType, useId, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  renderPopover: React.ReactNode;
  className?: string;
  as?: ElementType;
  placement: Placement;
  hasArrow?: boolean;
  offsetNum?: number;
}
export default function Popover({
  children,
  hasArrow,
  className,
  as: Element = 'div',
  renderPopover,
  placement = 'top',
  offsetNum = 5
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const arrowRef = useRef<SVGSVGElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [
      shift(),
      flip(),
      arrow({ element: arrowRef }),
      offset(offsetNum)
    ]
  });

  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return (
    <Element
      {...getReferenceProps()}
      ref={refs.setReference}
      className={className}
    >
      {children}

      {isOpen && (
        <FloatingPortal id={id}>
          <div
            {...getFloatingProps()}
            ref={refs.setFloating}
            style={floatingStyles}
          >
            <div>
              {hasArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  className='fill-white'
                  tipRadius={0}
                />
              )}
              {renderPopover}
            </div>
          </div>
        </FloatingPortal>
      )}
    </Element>
  );
}

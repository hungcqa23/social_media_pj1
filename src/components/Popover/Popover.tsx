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
  useFocus
} from '@floating-ui/react';
import { motion } from 'framer-motion';
import { ElementType, useId, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  renderPopover: React.ReactNode;
  className?: string;
  as?: ElementType;
  placement: Placement;
  hasArrow?: boolean;
}
export default function Popover({
  children,
  hasArrow,
  className,
  as,
  renderPopover,
  placement = 'top'
}: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const arrowRef = useRef<SVGSVGElement>(null);

  const data = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [shift(), flip(), arrow({ element: arrowRef })],
    placement,
    whileElementsMounted: autoUpdate
  });

  const { refs, floatingStyles, context } = data;

  const click = useClick(context);
  const focus = useFocus(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, focus]);

  return (
    <FloatingPortal id={id}>
      {hasArrow && (
        <FloatingArrow
          ref={arrowRef}
          context={context}
          width={10}
          fill='white'
          staticOffset={'10%'}
        />
      )}
      {open && (
        <motion.div
          {...getFloatingProps()}
          ref={refs.setReference}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={floatingStyles}
        >
          {children}
        </motion.div>
      )}
    </FloatingPortal>
  );
}

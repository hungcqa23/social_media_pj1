interface Props {
  children: React.ReactNode;
}
export default function MainLayout(props: Props) {
  const { children } = props;
  return <div className='flex h-screen w-screen'>{children}</div>;
}

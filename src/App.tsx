import { useState } from 'react';

const arr = ['cc'];
export default function App() {
  const [show, setShow] = useState(arr);
  console.log('Rendered again');
  return <button onClick={() => setShow([...arr, 'ss'])}>{show}</button>;
}

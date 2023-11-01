import SuggestedFriend from '../SuggestedFriend';

const SuggestedFriends: { id: number; username: string; fullName: string; srcImg?: string }[] = [
  {
    id: 1,
    username: 'anhungwindyy',
    fullName: 'An Hưng',
    srcImg:
      'https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    username: 'anhungwindyy',
    fullName: 'An Hưng'
  },
  {
    id: 3,
    username: 'anhungwindyy',
    fullName: 'An Hưng'
  },
  {
    id: 4,
    username: 'anhungwindyy',
    fullName: 'An Hưng'
  },
  {
    id: 5,
    username: 'anhungwindyy',
    fullName: 'An Hưng'
  }
];
export default function SuggestedList() {
  return (
    <div>
      <div className='px-4 py-1'>
        <span className='text-sm font-semibold text-gray-500'>Suggested for you</span>
      </div>
      {SuggestedFriends.map(friend => (
        <SuggestedFriend key={friend.id} username={friend.username} srcImg={friend?.srcImg} />
      ))}
    </div>
  );
}

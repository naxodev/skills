import { useState } from 'react';

export function RetentionToggle() {
  const [days, setDays] = useState(30);
  return <button onClick={() => setDays(days === 30 ? 90 : 30)}>Retention: {days} days</button>;
}

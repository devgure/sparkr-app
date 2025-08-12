import React from 'react';
import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { UserList } from './resources/users';
import { MatchList } from './resources/matches';
import { SubscriptionList } from './resources/subscriptions';

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} />
      <Resource name="matches" list={MatchList} />
      <Resource name="subscriptions" list={SubscriptionList} />
    </Admin>
  );
}

export default App;
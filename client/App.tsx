import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://localhost:4000',
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <ApolloProvider client={client}>
 <View >
     <Card containerStyle={{ marginTop: 15 }}>
          <Card.Title>FONTS</Card.Title>
          <Card.Divider />
          <Text h1>
            h1 Heading
          </Text>
          <MyComponent></MyComponent>
        </Card>
    </View>
    </ApolloProvider>
   
  );
}

const SEARCH_PLAYERS = gql`
query FindPlayer($search: String) {
  findPlayer(search: $search) {
    firstname
    lastname
  }
}
`;

function SearchPlayers(search: String) {
  const { loading, error, data } = useQuery(SEARCH_PLAYERS, {
    variables: {search}
  });
  return data
}


const MyComponent = () => (
  <Select options={options} />
)

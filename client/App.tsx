import Select from 'react-select'
import AsyncSelect from 'react-select/async';
import { View, ScrollView, StyleSheet, Image, FlatList } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
  }
})


export default function App() {
  const [cards, addCard] = useState<number[]>([])
  return (
    <ApolloProvider client={client}>
      <View style={styles.center}>
      <View>
        <SearchBox cards={cards} addCard={addCard}></SearchBox>
      </View>
      <View>
        <FlatList numColumns={4} data={cards} renderItem={({ item }) => <PlayerCard data={item} />} ></FlatList>
      </View>
      </View>
     

    </ApolloProvider>

  );
}


const PlayerCard = ({ data }: { data: number }) => {
  return (
    <Card key={data} containerStyle={{ marginTop: 15 }}>
      <Card.Title>{data}</Card.Title>
      <Card.Divider />
      <Text h1>
        h1 Heading
      </Text>
    </Card>
  )
}

const SEARCH_PLAYERS = gql`
query FindPlayer($search: String) {
  findPlayer(search: $search) {
    firstname
    lastname
    id
  }
}
`;

const SearchPlayers = async (inputValue: String) => {
  const res = await client.query({
    query: SEARCH_PLAYERS, variables: {
      search: inputValue
    }
  })
  var response = res.data.findPlayer.map((a: { firstname: string; lastname: string, id: number }) => ({
    label: a.firstname + " " + a.lastname,
    value: a.id
  }))

  return response
}


const SearchBox = ({ cards, addCard }: { cards: number[], addCard: Dispatch<SetStateAction<number[]>> }) => {
  const selectedInputRef = useRef<any>();

  return ( <AsyncSelect isClearable ref={selectedInputRef} onChange={(option: { label: string, value: string } | null) => {
    if (option != null) {
      addCard([...cards, parseInt(option.value)])
    }
  }} loadOptions={SearchPlayers} />)
 
}



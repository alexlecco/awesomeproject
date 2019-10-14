import React, { Component } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

export default class App extends Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          dataSource: resJson.movies,
          isLoading: false,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    console.log("dataSource::::", this.state.dataSource)
    if(this.state.isLoading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
        let movies = this.state.dataSource.map((val, key) => {
          return(
            <View key={key} style={styles.item}>
              <Text>{val.title}</Text>
            </View>
          )
        })

        return (
          <View style={styles.container}>
            {movies}
          </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  }
});

import { useState, useEffect } from 'react';
import SearchBox from './components/search-box/search-box.component';
import Cardlist from './components/card-list/card-list.component';

import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
        <h1 className="app-title">Cat Rolodex</h1>

        <SearchBox 
          className = 'monsters-search-box'
          onChangeHandler= {onSearchChange} 
          placeholder= 'search monster'
        />
        <Cardlist monsters={filteredMonsters} />
    </div>   
  );
}

// class App extends Component {
//   constructor() {
//     super();  

//     this.state = {
//       monsters: [],
//       searchField: '',
//     };  
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => 
//         this.setState(
//           () => {
//             return { monsters: users };
//           }
//         ) 
//       );
//   }  

//   onSearchChange = (event) =>{
//     console.log(event.target.value);
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   }

//   render() {
//     //console.log('render from AppJS');
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Rolodex</h1>

//         <SearchBox 
//           className = 'monsters-search-box'
//           onChangeHandler= {onSearchChange} 
//           placeholder= 'search monster'
//         />
//         <Cardlist monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;

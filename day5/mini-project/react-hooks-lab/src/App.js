import './App.css';
import Counter from './components/Counter';
import NameForm from './components/NameForm';
import ProfileEditor from './components/ProfileEditor';
import PostViewer from './components/PostViewer';
import Clock from './components/Clock';
import DebouncedSearch from './components/DebouncedSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Hooks Lab</h1>
        <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
          <Counter />
          <NameForm />
          <ProfileEditor />
          <PostViewer />
          <Clock />
          <DebouncedSearch />
        </div>
      </header>
    </div>
  );
}

export default App;
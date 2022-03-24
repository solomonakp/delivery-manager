import { Routes, Route } from 'react-router-dom';
import Container from 'Layout/Container';
import { routes } from 'utils/constants/routes.constants';

function App() {
  return (
    <div className='App'>
      <Container className='mx-auto'>
        <Routes>
          {routes.map(({ Component, path }, index) => (
            <Route path={path} element={<Component />} key={index} />
          ))}
        </Routes>
      </Container>
    </div>
  );
}

export default App;

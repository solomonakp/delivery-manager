import { Routes, Route } from 'react-router-dom';
import { routes } from 'utils/constants/routes.constants';
function App() {
  return (
    <Routes>
      {routes.map(({ Component, path }, index) => (
        <Route path={path} element={<Component />} key={index} />
      ))}
    </Routes>
  );
}

export default App;

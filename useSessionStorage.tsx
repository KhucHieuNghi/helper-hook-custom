const useSessionStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = React.useState(() => {
      try {
        const value = window.sessionStorage.getItem(keyName);
  
        if (value) {
          return JSON.parse(value);
        } else {
          window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
          return defaultValue;
        }
      } catch (err) {
        return defaultValue;
      }
    });
  
    const setValue = newValue => {
      try {
        window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
      } catch (err) {}
      setStoredValue(newValue);
    };
  
    return [storedValue, setValue];
  };

export default useSessionStorage;
//   const MyApp = () => {
//     const [name, setName] = useSessionStorage('name', 'John');
  
//     return <input value={name} onChange={e => setName(e.target.value)} />;
//   };
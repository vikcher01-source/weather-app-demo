"use client"; // Добавляем для клиентского компонента, чтобы useState работал

import { useState } from 'react'; // Для стейта, базовый импорт

export default function Home() {
  const [city, setCity] = useState(''); // Город от юзера
  const [weather, setWeather] = useState(null); // Данные погоды, null по умолчанию
  const [error, setError] = useState(''); // Для ошибок, если город не найден

  // TODO: Добавить больше полей, типа влажность или ветер, потом

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) {
      setError('Enter a city first!'); // Quick check
      return;
    }

    console.log("Fetching weather for: ", city); // Дебаг, полезно видеть в консоли

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Беру из env, безопасно
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&key&units=metric`);
      
      if (!res.ok) {
        throw new Error('City not found or API error'); // Ловим 404 или другие
      }

      const data = await res.json();
      setWeather(data); // Сохраняем данные
      setError(''); // Очищаем ошибку
      // console.log("Weather data: ", data); // Закомментировал, но оставил для тестов
    } catch (err) {
      if (err instanceof Error) {  // Фикс TS: проверяем тип ошибки
        console.error("Error: ", err.message); // Принт в консоль
        setError(err.message); // Показ юзеру
      } else {
        console.error("Unknown error: ", err); // Фоллбэк для других типов
        setError('An unknown error occurred.'); // Общий месседж
      }
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6"> {/* Изменил bg для тематики */}
      <h1 className="text-4xl font-bold mb-6">Weather App Demo</h1> {/* Больший шрифт для вида */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border border-gray-400 rounded mb-3"
          placeholder="Enter city name..." // Плейсхолдер с ellipsis
        />
        <button type="submit" className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600">Get Weather</button> {/* Зеленый для экшена */}
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>} {/* Ошибка в красном */}

      {weather && (
        <div className="mt-6 p-5 bg-white rounded shadow-md text-center">
          <h2 className="text-2xl font-semibold">{weather.name}, {weather.sys.country}</h2>
          <p className="text-xl">{Math.round(weather.main.temp)}°C</p> {/* Округляем темп */}
          <p>{weather.weather[0].description}</p>
          {/* Иконка погоды, простой img */}
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt="Weather icon" 
            className="mx-auto" 
          />
        </div>
      )}
    </div>
  );
}

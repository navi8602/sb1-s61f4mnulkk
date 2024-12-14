```typescript
// Добавим новую функцию для генерации данных метрик
export function generateMetricsData() {
  const hours = 24;
  const labels = Array.from({ length: hours }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - (hours - i));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  return {
    labels,
    temperature: Array.from({ length: hours }, () => 22 + Math.random() * 4),
    humidity: Array.from({ length: hours }, () => 60 + Math.random() * 10),
    nutrients: Array.from({ length: hours }, () => 80 + Math.random() * 20),
    ph: Array.from({ length: hours }, () => 6 + Math.random())
  };
}
```
# Uruchamianie

```bash
# instalacja pakietow
npm install

# zaktualizowanie lokalnie bazy danych
npm run db:push

# uruchomienie serwera deweloperskiego
npm run dev
```

# Struktura plików

## Backend

- Robimy coś w podobie IDesign, [tutaj ziomek dobrze tłumaczy](https://www.youtube.com/live/A-fOT-XMcag?si=eMuxYFdhiIUznxai&t=1318), 22:00-36:00 mozna sobie na 1.5x puscic
- My mamy router zamiast managera, bo tRPC
- Router waliduje input, sprawdza role, i wywoluje engine/accessy zeby cos zrobily
- w tRPC mamy query, czyli zapytania o dane (jak GET), i mutation, czyli jakaś akcja, zmienianie czegoś (jak POST)

Wszystkie te cegiełki dajemy do: `src/server/api`
Utilitiesy dajemy do: `src/server/utils`

## Klient (Frontend)

- Kazdy plik w `src/pages` to jedna podstrona, dajemy tam jak najmniej logiki i wszystko przerzucamy do komponentów z których ta podstrona jest stworzona
- Proponuje komponenty uzywane wszedzie dawac do `src/components`
- Proponuje np hooki uzywane wszedzie dawac do `src/hooks`
- Proponuje rzeczy zwiazane z dana funkcjonalnoscia/podstrona dawac do `src/features/{NAZWA}`

Przykladowo:
src/components/Button.tsx
src/components/Avatar.tsx

src/features/reservation/CreateReservationForm.tsx
src/features/reservation/ViewReservation.tsx
src/features/reservation/hooks/useReservation.ts

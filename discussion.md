### 1. Run this code

- Backend Running  
   cd server  
   yarn dev
- Frontend Running
  cd client  
   yarn start

### 2. Prioritize the time

- 30 mins to implement backend  
  15mins: Figuring out how to calculate the duration  
  15mins: setup api and backend server
- 20 mins to implement frontend

### 3. If I am assigned this task again

- use redux in frontend
- could implement the pagination
- should put calculation logic for duration on database using procedure or function

### 4. Decision points

- using Sequelize ORM considering real-time data comes from db
- complex calculation logic to calculate the duration

### 5. Questions

- I am suggesting that it is better to calculate the duration when the car exits and put it in db.
- we could generate session id when the car enters and track that session id when the car exits



Voting Application – Setup Instructions

This project contains:
1. Backend: ASP.NET Core Web API (.NET 8)
2. Frontend: Angular 8 Application

-------------------------------------------------
BACKEND SETUP
-------------------------------------------------

Prerequisites:
- .NET SDK 8.0+

Steps:
1. Unzip VotingApp-Backend.zip
2. Open terminal in VotingAppAPI folder
3. Run the following commands:

   dotnet restore
   dotnet run

4. Backend will start at:
   https://localhost:5001

Backend
dotnet restore
dotnet run

-------------------------------------------------
FRONTEND SETUP
-------------------------------------------------

Prerequisites:
- Node.js (v14 recommended)
- Angular CLI 8

Steps:
1. Unzip VotingApp-Frontend.zip
2. Open terminal in voting-app folder
3. Run the following commands:

   npm install
   ng serve

4. Frontend will start at:
   http://localhost:4200


🔹 Frontend
npm install
ng serve


-------------------------------------------------
NOTES
-------------------------------------------------

- Backend uses in-memory database (no SQL setup required).
- Backend must be running before starting frontend.
- Voting results update instantly after casting a vote.

-------------------------------------------------

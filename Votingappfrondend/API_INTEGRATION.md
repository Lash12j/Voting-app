# API Integration Guide

## Backend API Integration

This Angular frontend is integrated with a .NET 8 Web API backend.

## Configuration

### API Base URL

The API base URL is configured in the environment files:

- **Development**: `src/environments/environment.ts` - Default: `http://localhost:5267/api`
- **Production**: `src/environments/environment.prod.ts` - Update with your production API URL

To change the API URL, edit the `apiUrl` property in the respective environment file.

## API Endpoints Used

| Method | Endpoint | Description | Service |
|--------|----------|-------------|---------|
| GET | `/api/candidates` | List all candidates | `CandidateService.loadCandidates()` |
| POST | `/api/candidates` | Add a new candidate | `CandidateService.addCandidate()` |
| GET | `/api/voters` | List all voters | `VoterService.loadVoters()` |
| POST | `/api/voters` | Add a new voter | `VoterService.addVoter()` |
| POST | `/api/votes` | Cast a vote | `VoteService.castVote()` |

## Request/Response Formats

### Create Candidate Request
```json
{
  "name": "Candidate Name"
}
```

### Create Voter Request
```json
{
  "name": "Voter Name"
}
```

### Cast Vote Request
```json
{
  "voterId": 1,
  "candidateId": 2
}
```

### Candidate Response
```json
{
  "id": 1,
  "name": "Candidate Name",
  "voteCount": 0
}
```

### Voter Response
```json
{
  "id": 1,
  "name": "Voter Name",
  "hasVoted": false
}
```

## Setup Instructions

1. **Start the Backend API**
   ```bash
   cd backend/VotingAppAPI
   dotnet run
   ```
   The API should be running on `http://localhost:5267`

2. **Start the Angular Frontend**
   ```bash
   npm start
   ```
   The frontend will be available on `http://localhost:4200`

3. **Verify Integration**
   - Open browser DevTools (F12)
   - Check Network tab for API calls
   - Ensure CORS is properly configured on the backend

## CORS Configuration

Make sure your .NET backend has CORS configured to allow requests from `http://localhost:4200`:

```csharp
// In Program.cs or Startup.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowAngularApp");
```

## Error Handling

The services handle errors gracefully:
- Network errors are caught and displayed to users
- Validation errors from the backend are shown in the UI
- Loading states are managed automatically

## Troubleshooting

### API calls failing
1. Verify the backend is running on `http://localhost:5267`
2. Check CORS configuration in the backend
3. Verify the API endpoints match the expected format
4. Check browser console for detailed error messages

### Data not updating
- The services automatically refresh data after mutations (add/update)
- Check if the backend is returning updated data
- Verify signals are being updated correctly

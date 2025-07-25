import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10,
  duration: "50s",
};

export default function () {
  var events = [
    "kick_off",
    "full_time",
    "half_time",
    "gol",
    "substitution",
    "yellow_card",
    "red_card",
  ];
  var url = "https://dev.caskr.app/api/generate-images";
  const event = events[Math.floor(Math.random() * events.length)];

  const payload = JSON.stringify({
    event: event,
    team_local: "Test 1",
    team_visitante: "Test 2",
    logo_local:
      "https://rfgspzjirszjxyddzfqy.supabase.co/storage/v1/object/public/generic-image//genericTeam.png",
    logo_visitante:
      "https://rfgspzjirszjxyddzfqy.supabase.co/storage/v1/object/public/generic-image//genericTeam.png",
    color_local: "rgba(0,0,0,0.1)",
    color_visitante: "rgba(255,0,0,0.5)",
    points_local: "3",
    points_visitant: "1",
    event_team: "home",
  });

  const headers = {
    headers: {
      "Content-Type": "application/json",
      "Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZ3NwemppcnN6anh5ZGR6ZnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNDQ5OTUsImV4cCI6MjAyOTcyMDk5NX0.ZlXGjXPkUuwnJ378V68ymsDajI_6rbR6Ck_8L7yZdh8s",
    },
  };

  const res = http.post(url, payload, headers);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  sleep(1);
}

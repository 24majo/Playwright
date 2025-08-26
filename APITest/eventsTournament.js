import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10,
  duration: "30s",
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
  var url =
    "https://rfgspzjirszjxyddzfqy.supabase.co/functions/v1/test-events-match";
  const event = events[Math.floor(Math.random() * events.length)];

  const payload = JSON.stringify({
    match_id: 63144,
    time: 220,
    type: event,
    player: {
      number: "58",
      name: "Pedro Nila",
    },
    team: "home",
    period: "regular",
  });

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZ3NwemppcnN6anh5ZGR6ZnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNDQ5OTUsImV4cCI6MjAyOTcyMDk5NX0.ZlXGjXPkUuwnJ378V68ymsDajI_6rbR6Ck_8L7yZdh8",
    },
  };

  const res = http.post(url, payload, headers);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  sleep(1);
}

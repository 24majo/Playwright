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
    },
  };

  const res = http.post(url, payload, headers);

  check(res, {
    "status 200": (r) => r.status === 200,
  });

  sleep(1);
}

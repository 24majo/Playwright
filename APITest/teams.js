import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50,
  duration: '20s', 
};

export default function () {
    var random = Math.floor(Math.random() * 116) + 1
    var imagen = `persona${random}.jpg`

    var url = `http://10.100.22.79:8000/api/remove-background/avatar-player/00df983f-7dec-44fa-aaf6-8fb15c14cb23*1712239880383*${imagen}`

    let res = http.get(url)

    check(res, {
      'status HTTP is 200': (r) => r.status === 200,
      'API code is 200': (r) => JSON.parse(r.body).code === 200,
      'message OK': (r) => JSON.parse(r.body).status_resp === 'success',
    })

    console.log(`Imagen: ${imagen} => Status: ${res.status}`)
    console.log(`Response: ${JSON.stringify(res.body)}`)
    sleep(1)
}

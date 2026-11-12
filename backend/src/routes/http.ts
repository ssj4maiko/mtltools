export function jsonReply(reply: { header: Function; send: Function; code?: Function }, body: string) {
  return reply
    .header("Content-Type", "application/json")
    .header("Cache-Control", "no-cache, private")
    .header("Access-Control-Allow-Origin", "*")
    .send(body);
}

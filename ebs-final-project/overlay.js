const net = require('net')
const tool = require('./tool')
const portOverlay = 3001

process.title = 'overlay'

const subscribers = []

const server = net.createServer(function (socket) {
    console.log('Connected')
    socket.on('data', function (data) {
        data = data.toString('utf8')
        let clientType = data.split(' ')[0]
        console.log(data)
        if (clientType === 'subscriber') {
            const payload = data.slice(clientType.length + 1, data.length)
            console.log(tool.parseSub(payload))
            subscribers.push({ socket, conditions: tool.parseSub(payload) })
        }

        if (clientType === 'publisher') {
            const payload = data.slice(clientType.length + 1, data.length)
            const matches = tool.parsePub(payload)

            for (let subscriber of subscribers) {
                const { socket: toSend, conditions } = subscriber
                for (let match of matches) {
                    let flag = true
                    for (let condition of conditions) {
                        for (let key in condition) {
                            console.log(condition[key])
                            if (condition[key]) {
                                const { operator, value } = condition[key]
                                console.log(eval(`'${match[key].value}' ${operator} '${value}'`))
                                if(isNaN(value)){
                                    if (eval(`'${match[key].value}' ${operator} '${value}'`) === false) {
                                        flag = false
                                        break
                                    }
                                }else{
                                    if (eval(`${match[key].value} ${operator} ${value}`) === false) {
                                        flag = false
                                        break
                                    }
                                }
                                
                            }
                        }
                    }
                    console.log(flag)
                    if (flag) {
                        let finalPublicationString = ''
                        for (const [key, value] of Object.entries(match)) {
                            if (key == "date") {
                              finalPublicationString += `(${key},${value.getDate()}.${value.getMonth()}.${value.getFullYear()});`;
                            } else if (isNaN(value)) {
                              finalPublicationString += `(${key},"${value.value}");`;
                            } else {
                              finalPublicationString += "(" + key + "," + value.value + ");";
                            }
                          }
                        
                        toSend.write(finalPublicationString)
                        toSend.write("\n")
                    }
                }
            }
        }
    })

    socket.on('close', () => {})
    socket.on('error', () => {})
})

server.listen(portOverlay, 'localhost')

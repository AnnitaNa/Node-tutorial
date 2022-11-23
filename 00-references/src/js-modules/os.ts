import os from "os";

const currentOs = {
	name: os.type(),
	release: os.release(),
	totalMem: os.totalmem(),
	freeMem: os.freemem(),
	"uptime-in-seconds": os.uptime(),
	userInfo: os.userInfo(),
};

console.log(currentOs);

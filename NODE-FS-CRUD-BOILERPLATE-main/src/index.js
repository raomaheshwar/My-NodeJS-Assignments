const fs = require('fs/promises')

const myFileWriter = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	try{
		await fs.writeFile(fileName + '.txt', fileContent);
		console.log(`${fileName}.txt created with content: "${fileContent}"`);
	}
	catch(error) {
		console.log('Error writing file:', error);
	}
}

const myFileReader = async (fileName) => {
	// write code here
	// dont chnage function name
	try {
		const content = await fs.readFile(fileName + '.txt', 'utf-8');
		console.log(`Content of ${fileName}.txt: ${content}`);
	}
	catch (error){
		console.log('Error reading file:', error);
	}
}


const myFileUpdater = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	try {
		const existingContent = await fs.readFile(fileName + '.txt', 'utf-8');
		const updatedContent = existingContent + fileContent;
		await fs.writeFile(fileName + '.txt', updatedContent);
		console.log(`${fileName}.txt updated with new content: "${fileContent}"`);
	}
	catch (error) {
		console.log('Error updating file:', error);
	}
}

const myFileDeleter = async (fileName) => {
	// write code here
	// dont chnage function name
	try {
		await fs.unlink(fileName + '.txt');
		console.log(`${fileName}.txt deleted.`);
	}catch (error) {
		console.log('Error deleting file:', error);
	}
}

myFileWriter('testfile', 'Hello');
myFileReader('testfile');
myFileUpdater('testfile', ' World');
myFileDeleter('testfile');



module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter }
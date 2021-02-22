const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => "Your notes...";

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicatedNotes = notes.filter(note => note.title === title);

    debugger

    if (duplicatedNotes.length === 0) {
        notes.push({ title: title, body: body });
    }
    else {
        console.log("Note title taken");
    }

    saveNotes(notes);
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (err) {
        return [];
    }

}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesAfterRemotion = notes.filter(note => note.title != title);

    if(notesAfterRemotion.length === notes.length) {
        console.log(chalk.red('Note not found with title '+ title));
    }

    else{
        saveNotes(notesAfterRemotion);
        console.log(chalk.green('Note with title '+ title+ ' removed successfully'));
    }
    
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green('Your notes'));
    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();

    const noteToRead = notes.find(note => note.title === title);

    if(noteToRead){
        console.log(chalk.inverse(noteToRead.title));
        console.log(noteToRead.body);
    }

    else{
        console.log(chalk.red('Note with title '+title+ ' not found'));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
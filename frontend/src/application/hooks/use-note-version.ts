import { NoteVersionRepository } from "../../data/repository/NoteVersionRepository";
import type {
  NoteVersion,
  NoteVersionCreate,
} from "../../domain/entities/note-version";
import { handleError } from "../../util/error-handler-util";
import { CreateNewNoteVersionUsecase } from "../usecase/noteversion/CreateNewNoteVersionUsecase";
import { ListVersionsOfNoteUsecase } from "../usecase/noteversion/ListVersionsOfNoteUsecase";
import { useState } from "react";

function useNoteVersion() {
  const noteVersionRepo = new NoteVersionRepository();
  const [error, setError] = useState<string | null>(null);
  const [noteVersions, setNoteVersions] = useState<NoteVersion[]>([]);

  const listNoteVersions = async (noteId: string) => {
    const listVersionsOfNoteUsecase = new ListVersionsOfNoteUsecase(
      noteVersionRepo
    );
    try {
      const versions = await listVersionsOfNoteUsecase.execute(noteId);
      console.log(versions);
      setNoteVersions(versions);
    } catch (err) {
      handleError(error, setError);
    }
  };

  const createNoteVersion = async (noteVersionCreate: NoteVersionCreate) => {
    const createNoteVersionUsecase = new CreateNewNoteVersionUsecase(
      noteVersionRepo
    );
    try {
      const version = await createNoteVersionUsecase.execute(noteVersionCreate);
      console.log(version);
      setNoteVersions((prev) => [...prev, version]);
    } catch (err) {
      handleError(error, setError);
    }
  };

  return { noteVersions, listNoteVersions, createNoteVersion, error };
}

export default useNoteVersion;

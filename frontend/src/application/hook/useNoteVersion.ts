import { NoteVersionRepository } from "../../data/repository/NoteVersionRepository";
import type { NoteVersionCreate } from "../../domain/entities/note-version";
import { CreateNewNoteVersionUsecase } from "../usecase/noteversion/CreateNewNoteVersionUsecase";
import { ListVersionsOfNoteUsecase } from "../usecase/noteversion/ListVersionsOfNoteUsecase";
import { useDispatch } from "react-redux";
import {
  addCurrentEditingNoteVersion,
  setCurrentEditingNoteVersions,
} from "../../features/note/noteSlice";

function useNoteVersion() {
  const noteVersionRepo = new NoteVersionRepository();
  const dispatch = useDispatch();

  const createNoteVersion = async (noteVersionCreate: NoteVersionCreate) => {
    const createNoteVersionUsecase = new CreateNewNoteVersionUsecase(
      noteVersionRepo
    );
    const noteVersion = await createNoteVersionUsecase.execute(
      noteVersionCreate
    );
    dispatch(addCurrentEditingNoteVersion({ version: noteVersion }));
  };

  const listNoteVersions = async (noteId: string) => {
    const listNoteVersionsUsecase = new ListVersionsOfNoteUsecase(
      noteVersionRepo
    );
    const versions = await listNoteVersionsUsecase.execute(noteId);
    dispatch(setCurrentEditingNoteVersions({ versions: versions }));
  };

  return { createNoteVersion, listNoteVersions };
}

export default useNoteVersion;

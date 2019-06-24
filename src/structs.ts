import { SliceMapper } from "./sliceMapper";

const GAF_HEADER_FIELDS = {
    IDVersion: 0,
    Entries: 1,
    Unknown1: 2,
};

const ENTRY_HEADER_FIELDS = {
    Frames: 0,
    Unknown1: 1,
    Unknown2: 2,
    Name: 3,
};

const FRAME_POINTER_HEADER_FIELDS = {
    PtrFrameTable: 0,
    Unknown1: 1,
};

const FRAME_HEADER_FIELDS = {
    Width: 0,
    Height: 1,
    XPos: 2,
    YPos: 3,
    Unknown1: 4,
    Compressed: 5,
    FramePointers: 6,
    Unknown2: 7,
    PtrFrameData: 8,
    Unknown3: 9,
};

export const GAF_HEADER = {
    fields: GAF_HEADER_FIELDS,
    mapper: new SliceMapper([
        [GAF_HEADER_FIELDS.IDVersion, 4],
        [GAF_HEADER_FIELDS.Entries, 4],
        [GAF_HEADER_FIELDS.Unknown1, 4],
    ])
}

export const ENTRY_HEADER = {
    fields: ENTRY_HEADER_FIELDS,
    mapper: new SliceMapper([
        [ENTRY_HEADER_FIELDS.Frames, 2],
        [ENTRY_HEADER_FIELDS.Unknown1, 2],
        [ENTRY_HEADER_FIELDS.Unknown2, 4],
        [ENTRY_HEADER_FIELDS.Name, 32],
    ]),
}

export const FRAME_POINTER_HEADER = {
    fields: FRAME_POINTER_HEADER_FIELDS,
    mapper: new SliceMapper([
        [FRAME_POINTER_HEADER_FIELDS.PtrFrameTable, 4],
        [FRAME_POINTER_HEADER_FIELDS.Unknown1, 4],
    ]),
};

export const FRAME_HEADER = {
    fields: FRAME_HEADER_FIELDS,
    mapper: new SliceMapper([
        [FRAME_HEADER_FIELDS.Width, 2],
        [FRAME_HEADER_FIELDS.Height, 2],
        [FRAME_HEADER_FIELDS.XPos, 2],
        [FRAME_HEADER_FIELDS.YPos, 2],
        [FRAME_HEADER_FIELDS.Unknown1, 1],
        [FRAME_HEADER_FIELDS.Compressed, 1],
        [FRAME_HEADER_FIELDS.FramePointers, 2],
        [FRAME_HEADER_FIELDS.Unknown2, 4],
        [FRAME_HEADER_FIELDS.PtrFrameData, 4],
        [FRAME_HEADER_FIELDS.Unknown3, 4],
    ]),
};

let _stream = null;
export const saveStream = (s) => { _stream = s; };
export const takeStream = () => { const s = _stream; _stream = null; return s; };
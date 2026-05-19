import fs from 'fs';
import path from 'path';

const MODEL_DIR = path.join(process.cwd(), 'public', 'models');

function exists(filename) {
  try {
    return fs.existsSync(path.join(MODEL_DIR, filename));
  } catch {
    return false;
  }
}

export default function handler(_req, res) {
  res.status(200).json({
    avatar: exists('avatar.glb'),
    office: exists('office.glb'),
    contactProps: exists('contact-props.glb'),
    contactRoom: exists('contact-room.glb'),
  });
}

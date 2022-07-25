const { createBrotliCompress, createBrotliDecompress } = require("zlib");
const { createReadStream, createWriteStream, unlinkSync } = require("fs");
const { pipeline } = require("stream");
const { promisify } = require("util");

// remove old
try {
  unlinkSync(process.cwd() + "/input.txt.gz");
} catch {
  //
}

try {
  unlinkSync(process.cwd() + "/decompressed.txt");
} catch {
  //
}

const pipe = promisify(pipeline);

async function compress(input, output) {
  const compress = createBrotliCompress();
  const source = createReadStream(input);
  const destination = createWriteStream(output);

  await pipe(source, compress, destination);
}

async function decompress(input, output) {
  const decompress = createBrotliDecompress();
  const source = createReadStream(input);
  const destination = createWriteStream(output);

  await pipe(source, decompress, destination);
}

async function doit() {
  try {
    await compress(
      process.cwd() + "/input.txt",
      process.cwd() + "/input.txt.gz"
    );
  } catch (err) {
    console.error("An error occurred:", err);
    process.exitCode = 1;
  }

  try {
    await decompress(
      process.cwd() + "/input.txt.gz",
      process.cwd() + "/decompressed.txt"
    );
  } catch (err) {
    console.error("An error occurred:", err);
    process.exitCode = 1;
  }
}

doit();

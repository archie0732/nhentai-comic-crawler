process.stdout.write("aaaaa\n");

setTimeout(() => {
  // 移动光标到上一行
  process.stdout.moveCursor(0, -1);
  // 清除当前行
  process.stdout.clearLine(0);
  // 移动光标到当前行开始
  process.stdout.cursorTo(0);
  // 清除这一行
  process.stdout.clearLine(0);
}, 1000);

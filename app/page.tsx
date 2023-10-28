import { promises as fs } from "fs";

export default async function Home() {
  const cvs = process.cwd() + "/local/transactions.csv";

  const data = await fs.readFile(cvs, "utf8");

  const [headerRow, ...rows] = data.split("\n");
  const headers = headerRow.split(";");

  const parsedData = rows.map((row) => {
    const cols = row.split(";");
    const obj: Record<string, string | number> = {};

    cols.forEach((col, index) => {
      const header = headers[index];
      obj[header] = col;
    });

    return obj;
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {parsedData.map((row, index) => (
          <div key={index} className=" border-b-2 py-12">
            {Object.entries(row).map((entry, index) => (
              <div key={index} className="grid grid-cols-2 gap-0">
                <div>{entry[0]}</div>
                <div>{entry[1]}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

# OfficeX Types

Typescript types for `OfficeX Drive`. View Documentation at https://dev.officex.app

```ts
import { IRequestCreateDisk, IResponseCreateDisk, DiskTypeEnum, Disk } = "@officexapp/types";

const run = async () => {
   const body: IRequestCreateDisk = {
      action: "CREATE";
      name: string;
      disk_type: DiskTypeEnum.LocalSSD,
      public_note: "My alternative disk";
   }
   const response = await fetch({
      url: "https://api.officex.app/v1/my-drive-id/disks/upsert",
      body,
      headers: { Authorization: "Bearer mytoken" }
   })
   if (!response.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
   }
   const data: IResponseCreateDisk = await response.json();
   const disk: Disk = response.ok?.data?
}
run()
```

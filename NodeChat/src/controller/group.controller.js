import { createGroupRepo, getGroupData } from "../repo/group.repo.js"

export const createGroup = async (req, res) => {
   try {
      const userId = req.session._id;
      const isGroupCreated = await createGroupRepo(req.body, userId)

      if (isGroupCreated.success) {
         return res.status(200).send({ mess: `Group Created.`, groupData: isGroupCreated.group })
      }
      else {
         return res.status(400).send({ mess: isGroupCreated.mess })
      }
   }
   catch (err) {
      console.log(err.message);
      return res.status(400).send({ success: false, mess: `Something went wrong..` })
   }
}

export const getGroupInfo = async (req, res) => {
   try {
      const grpId = req.body.groupId

      const grpData = await getGroupData(grpId)

      if (grpData.success) {
         return res.status(200).send({ groupData: grpData.groupData })
      }
      else {
         return res.status(400).send({ mess: `No group data found.` })
      }
   }
   catch (err) {
      console.log(err.message);
      return res.status(400).send({ success: false, mess: `Something went wrong..` })
   }
}

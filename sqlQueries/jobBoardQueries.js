const getAllJobBoardsQuery = `
  SELECT 
    jb.JobBoardId,
    jb.JobBoardName,
    c.CompanyName,
    c.Country,
    c.Region,
    jb.RequiredTech,
    jb.RecruitmentReward,
    part.partName,
    exp.experienceLevelName
  FROM tb_jobboard jb
  JOIN tb_company c ON jb.CompanyId = c.CompanyId
  JOIN tb_position p ON jb.PositionId = p.positionId
  JOIN tb_part part ON p.partId = part.partId
  JOIN tb_experienceLevel exp ON p.experienceLevelId = exp.experienceLevelId
`;

const getJobBoardQuery = `
  SELECT 
    jb.JobBoardId,
    jb.JobBoardName,
    c.CompanyName,
    c.Country,
    c.Region,
    jb.RequiredTech,
    jb.RecruitmentReward,
    part.partName,
    exp.experienceLevelName,
    jb.JobDescription,
    (
      SELECT JSON_ARRAYAGG(otherJb.JobBoardId) 
      FROM tb_jobboard otherJb
      WHERE otherJb.CompanyId = jb.CompanyId 
      AND otherJb.JobBoardId != jb.JobBoardId
    ) AS relatedJobBoards
  FROM tb_jobboard jb
  JOIN tb_company c ON jb.CompanyId = c.CompanyId
  JOIN tb_position p ON jb.PositionId = p.positionId
  JOIN tb_part part ON p.partId = part.partId
  JOIN tb_experienceLevel exp ON p.experienceLevelId = exp.experienceLevelId
  WHERE jb.JobBoardId = :JobBoardId
`;

const searchJobBoardQuery = `
  SELECT 
    jb.JobBoardId,
    jb.JobBoardName,
    c.CompanyName,
    c.Country,
    c.Region,
    jb.RequiredTech,
    jb.RecruitmentReward,
    part.partName,
    exp.experienceLevelName
  FROM tb_jobboard jb
  JOIN tb_company c ON jb.CompanyId = c.CompanyId
  JOIN tb_position p ON jb.PositionId = p.positionId
  JOIN tb_part part ON p.partId = part.partId
  JOIN tb_experienceLevel exp ON p.experienceLevelId = exp.experienceLevelId
  WHERE 
    jb.JobBoardName LIKE :searchTerm
    OR c.CompanyName LIKE :searchTerm
    OR c.Country LIKE :searchTerm
    OR c.Region LIKE :searchTerm
    OR jb.RequiredTech LIKE :searchTerm
    OR jb.RecruitmentReward LIKE :searchTerm
    OR part.partName LIKE :searchTerm
    OR exp.experienceLevelName LIKE :searchTerm
`;


module.exports = {
  getAllJobBoardsQuery,
  getJobBoardQuery,
  searchJobBoardQuery,
};

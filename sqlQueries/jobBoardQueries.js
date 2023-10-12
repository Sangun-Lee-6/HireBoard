const getAllJobBoardsQuery = `
  SELECT 
    jb.JobBoardId,
    jb.JobBoardName,
    c.CompanyName,
    c.Country,
    c.Region,
    jb.RequiredTech,
    jb.JobDescription,
    jb.RecruitmentReward,
    part.partName,
    exp.experienceLevelName
  FROM tb_jobboard jb
  JOIN tb_company c ON jb.CompanyId = c.CompanyId
  JOIN tb_position p ON jb.PositionId = p.positionId
  JOIN tb_part part ON p.partId = part.partId
  JOIN tb_experienceLevel exp ON p.experienceLevelId = exp.experienceLevelId
`;

module.exports = {
  getAllJobBoardsQuery
};

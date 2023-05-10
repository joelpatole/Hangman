import { PipelineStage, Types, isValidObjectId } from "mongoose";
export const generatePipeline = (query: any) => {
  const pipeline: PipelineStage[] = [];
  const { page, limit, sort, order, ...remaining} = query;
  for (let key in remaining) {
    if (remaining[key].length === 24)
      remaining[key] = new Types.ObjectId(remaining[key]);
    else if (parseInt(remaining[key])) remaining[key] = parseInt(remaining[key]);
    else if (remaining[key] === "true" || remaining[key] === "false") {
      remaining[key] === "true"
        ? (remaining[key] = true)
        : (remaining[key] = false);
    } else remaining[key];
    pipeline.push({
      $match: {
        [key]: remaining[key],
      },
    });
  }
  const pageNo = page ? +page : 1;
  const limitNo = limit ? +limit : 3;
  const skipNo = (pageNo - 1) * limitNo;
  pipeline.push({
    $skip: skipNo,  
  });
  pipeline.push({
    $limit: limitNo,
  });
  if (sort) {
    pipeline.push({
      $sort: {
        [sort]: order === "desc" ? -1 : 1,
      },
    });
  }
  return pipeline;
};
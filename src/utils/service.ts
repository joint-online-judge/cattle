import { CodeFile, RecordResp } from '@/client';
import { request as __request } from '@/client/core/request';

// @chujie: temporarily rewrite of generated service
export const submitProblem = async (
  problem: string,
  requestBody: CodeFile,
): Promise<RecordResp> => {
  const result = await __request({
    method: 'POST',
    path: `/api/v1/problems/${problem}`,
    formData: requestBody, // @chujie: this line is the keypoint
    errors: {
      422: `Validation Error`,
    },
  });
  return result.body;
};

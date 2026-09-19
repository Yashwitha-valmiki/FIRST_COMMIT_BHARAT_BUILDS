import { CreateScheduleCommand, SchedulerClient } from "@aws-sdk/client-scheduler";

const scheduler = new SchedulerClient({ region: process.env.AWS_REGION || "us-east-1" });

export async function createOneTimeReminder(params: {
  scheduleName: string;
  atIso: string;
  targetArn: string;
  roleArn: string;
  payload: Record<string, any>;
}) {
  const cmd = new CreateScheduleCommand({
    Name: params.scheduleName,
    FlexibleTimeWindow: { Mode: "OFF" },
    ScheduleExpression: `at(${params.atIso.replace(".000Z","")})`,
    Target: {
      Arn: params.targetArn,
      RoleArn: params.roleArn,
      Input: JSON.stringify(params.payload)
    }
  });
  return scheduler.send(cmd);
}

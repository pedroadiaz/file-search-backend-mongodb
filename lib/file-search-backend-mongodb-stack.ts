import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration} from 'aws-cdk-lib/aws-apigateway';
import { RestApi} from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';
import { ConfigProps, config } from './env-config';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

const stage = process.env.STAGE ?? "development";

export type AwsEnvStackProps = cdk.StackProps & {
  config: Readonly<ConfigProps>
}

export class FileSearchBackendMongodbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsEnvStackProps) {
    super(scope, id, props);

    const {config} = props;

    const api =  new RestApi(this, `file-search-backend-mongodb-${stage}`, {
      description: "mongodb lambda backend",
      deployOptions: {
        stageName: stage
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Accept",
          "Content-Type",
          "Content-Length",
          "Authorization"
        ],
        allowOrigins: ["*"],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      }
    })

    const createUserLambda = nodejsLambda(this, "createUserLambda", "../src/functions/user/createUser.ts");
    const updateUserLambda = nodejsLambda(this, "updateUserLambda", "../src/functions/user/updateUser.ts");
    const getUsersLambda = nodejsLambda(this, "getUsersLambda", "../src/functions/user/getUsers.ts");
    const getUserById = nodejsLambda(this, "getUserById", "../src/functions/user/getUserById.ts");
    const getUserByEmail = nodejsLambda(this, "getUserByEmail", "../src/functions/user/getUserByEmail.ts");
    const deleteByIdLambda = nodejsLambda(this, "deleteByIdLambda", "../src/functions/user/deleteById.ts");

    const usersAPI = api.root.addResource("users");
    const idPath = usersAPI.addResource("{id}");
    const emailPath = usersAPI.addResource("email");

    usersAPI.addMethod("POST", new LambdaIntegration(createUserLambda));
    usersAPI.addMethod("PUT", new LambdaIntegration(updateUserLambda));
    usersAPI.addMethod("GET", new LambdaIntegration(getUsersLambda));
    idPath.addMethod("GET", new LambdaIntegration(getUserById));
    idPath.addMethod("DELETE", new LambdaIntegration(deleteByIdLambda));
    emailPath.addMethod("GET", new LambdaIntegration(getUserByEmail));

    const createClassLambda = nodejsLambda(this, "createClassLambda", "../src/functions/class/createClass.ts");
    const updateClassLambda = nodejsLambda(this, "updateClassLambda", "../src/functions/class/updateClass.ts");
    const getClassesLambda = nodejsLambda(this, "getClassesLambda", "../src/functions/class/getClasses.ts");
    const getClassById = nodejsLambda(this, "getClassById", "../src/functions/class/getClassById.ts");
    const getClassByUser = nodejsLambda(this, "getClassByUser", "../src/functions/class/getClassByUser.ts");
    const deleteClassByIdLambda = nodejsLambda(this, "deleteClassByIdLambda", "../src/functions/class/deleteById.ts");

    const classAPI = api.root.addResource("classes");
    const classIdPath = classAPI.addResource("{id}");
    const usersPath = classAPI.addResource("users");

    classAPI.addMethod("POST", new LambdaIntegration(createClassLambda));
    classAPI.addMethod("PUT", new LambdaIntegration(updateClassLambda));
    classAPI.addMethod("GET", new LambdaIntegration(getClassesLambda));
    classIdPath.addMethod("GET", new LambdaIntegration(getClassById));
    classIdPath.addMethod("DELETE", new LambdaIntegration(deleteClassByIdLambda));
    usersPath.addMethod("GET", new LambdaIntegration(getClassByUser));

    const createBookLambda = nodejsLambda(this, "createBookLambda", "../src/functions/book/createBook.ts");
    const updateBookLambda = nodejsLambda(this, "updateBookLambda", "../src/functions/book/updateBook.ts");
    const getBooksLambda = nodejsLambda(this, "getBooksLambda", "../src/functions/book/getBooks.ts");
    const getBookById = nodejsLambda(this, "getBookById", "../src/functions/book/getBookById.ts");
    const getBookByUser = nodejsLambda(this, "getBookByUser", "../src/functions/book/getBookByUser.ts");
    const deleteBookByIdLambda = nodejsLambda(this, "deleteBookByIdLambda", "../src/functions/book/deleteById.ts");

    const booksAPI = api.root.addResource("books");
    const bookIdPath = booksAPI.addResource("{id}");
    const usersBookPath = booksAPI.addResource("users");

    booksAPI.addMethod("POST", new LambdaIntegration(createBookLambda));
    booksAPI.addMethod("PUT", new LambdaIntegration(updateBookLambda));
    booksAPI.addMethod("GET", new LambdaIntegration(getBooksLambda));
    bookIdPath.addMethod("GET", new LambdaIntegration(getBookById));
    bookIdPath.addMethod("DELETE", new LambdaIntegration(deleteBookByIdLambda));
    usersBookPath.addMethod("GET", new LambdaIntegration(getBookByUser));
    
    const queryLambda = nodejsLambda(this, "queryLambda", "../src/functions/query/queryEmbeddings.ts");
    const queryAPI = api.root.addResource("query");
    queryAPI.addMethod("POST", new LambdaIntegration(queryLambda));
    const deleteVectorDataLambda = nodejsLambda(this, "deleteVectorData", "../src/functions/admin/deleteClassData.ts");
    const deleteVectorDataAPI = api.root.addResource("admin");
    deleteVectorDataAPI.addMethod("DELETE", new LambdaIntegration(deleteVectorDataLambda));

    const createPromptLambda = nodejsLambda(this, "createPromptLambda", "../src/functions/prompt/createPrompt.ts");
    const getPromptsLambda = nodejsLambda(this, "getPromptsLambda", "../src/functions/prompt/getPrompts.ts");
    const getPromptByClass = nodejsLambda(this, "getPromptByClass", "../src/functions/prompt/getPromptsByClass.ts");
    const deletePromptByIdLambda = nodejsLambda(this, "deletePromptByIdLambda", "../src/functions/prompt/deletePrompts.ts");

    const promptAPI = api.root.addResource("prompts");
    const promptByIdPath = promptAPI.addResource("{id}");
    const promptByClassPath = promptAPI.addResource("class");

    promptAPI.addMethod("POST", new LambdaIntegration(createPromptLambda));
    promptAPI.addMethod("GET", new LambdaIntegration(getPromptsLambda));
    promptByIdPath.addMethod("DELETE", new LambdaIntegration(deletePromptByIdLambda));
    promptByClassPath.addMethod("GET", new LambdaIntegration(getPromptByClass));

    const createFeedbackLambda = nodejsLambda(this, "createFeedbackLambda", "../src/functions/feedback/createFeedback.ts");
    const getFeedbackLambda = nodejsLambda(this, "getFeedbackLambda", "../src/functions/feedback/getFeedback.ts");
    const getFeedbackById = nodejsLambda(this, "getFeedbackById", "../src/functions/feedback/getFeedbackById.ts");
    const deleteFeedbackByIdLambda = nodejsLambda(this, "deleteFeedbackByIdLambda", "../src/functions/feedback/deleteFeedback.ts");

    const feedbackAPI = api.root.addResource("feedback");
    const feedbackByIdPath = feedbackAPI.addResource("{id}");

    feedbackAPI.addMethod("POST", new LambdaIntegration(createFeedbackLambda));
    feedbackAPI.addMethod("GET", new LambdaIntegration(getFeedbackLambda));
    feedbackByIdPath.addMethod("DELETE", new LambdaIntegration(deleteFeedbackByIdLambda));
    feedbackByIdPath.addMethod("GET", new LambdaIntegration(getFeedbackById));
    
    const sagemakerLambda = nodejsLambda(this, "sagemakerLambda", "../src/functions/query/sageMaker.ts");
    const sagemakerAPI = api.root.addResource("sagemaker");
    sagemakerAPI.addMethod("POST", new LambdaIntegration(sagemakerLambda));
    
    const convertUrlLambda = nodejsLambda(this, "convertUrlLambda", "../src/functions/processFiles/convertUrlToText.ts");
    const convertUrlAPI = api.root.addResource("url");
    convertUrlAPI.addMethod("POST", new LambdaIntegration(convertUrlLambda));
    
    const convertYoutubeLambda = nodejsLambda(this, "convertYoutubeLambda", "../src/functions/processFiles/convertYouTubeToText.ts");
    const convertYoutubeAPI = api.root.addResource("youtube");
    convertYoutubeAPI.addMethod("POST", new LambdaIntegration(convertYoutubeLambda));
  }
}

export const nodejsLambda = (scope: Construct, description: string, lambdaPath: string, duration: number = 30, memory: number = 128) => {
  return new NodejsFunction(scope, description, 
    {
      runtime: Runtime.NODEJS_18_X,
      entry: path.join(__dirname, lambdaPath),
      handler: "handler",
      environment: {
        MONGO_URL: config.MONGO_URL,
        OPENAI_API_KEY: config.OPENAI_API_KEY,
        SAGE_MAKER_ENDPOINT: config.SAGE_MAKER_ENDPOINT
      },
      memorySize: memory,
      timeout: cdk.Duration.seconds(duration),
    });
} 

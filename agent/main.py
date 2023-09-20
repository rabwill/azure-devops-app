import os
from pwr import Project, CodeLayer
from dotenv import load_dotenv
import argparse
load_dotenv()


class TeamsAppAgent(Project):

    def __init__(self, path, **kwargs):
        layers = [           
            CodeLayer(
                header='Cards - Layer 0',
                code_relative_path='teamsBot',
                human_label='Cards',
                flag_label='cards'
            ),           
            CodeLayer(
                header='BOT - Layer 1',
                code_relative_path='teamsBot',
                human_label='BOT',
                flag_label='bot'
            ),
             CodeLayer(
                header='API - Layer 2',
                code_relative_path='api',
                human_label='API',
                flag_label='api'
            )
        ]
        super().__init__(path, layers, **kwargs)


if __name__ == "__main__":

    # parse command line parameters 
    parser = argparse.ArgumentParser()
    parser.add_argument('--path', type=str)
    parser.add_argument('--change', type=str)
    args = parser.parse_args()

    change = args.change
    path = args.path

    if not path:
        raise Exception('Path is required; use --path <relative path to project>')

    if not change:
        raise Exception('Change is required; use --change <change>')

    kwargs = {
        'debug': {
            'write_file': True,
            'llm': False,
            'steps': True,
            'plan': True
        },
        'llm': {
            
        }
    }

    path = os.path.join(os.path.dirname(__file__), path)

    agent = TeamsAppAgent(
        path=path
    )

    agent.forward(change, **kwargs)

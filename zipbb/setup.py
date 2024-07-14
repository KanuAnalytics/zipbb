from setuptools import setup, find_packages

setup(
    name='zipbb',
    version='0.1',
    packages=find_packages(),
    entry_points={
        'console_scripts': [
            'zipbb=zipbb.parser:main',
        ],
    },
    install_requires=[],
    description='A tool to parse .zipbb files and extract script data',
    author='teamGreenVenom',
    # author_email='team@venom.green',
    # url='https://venom.green/zipbb',
    classifiers=[
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    python_requires='>=3.6',
)

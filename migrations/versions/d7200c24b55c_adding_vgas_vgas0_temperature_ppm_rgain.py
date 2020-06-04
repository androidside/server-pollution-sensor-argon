"""adding vgas, vgas0, temperature, ppm, rgain

Revision ID: d7200c24b55c
Revises: 39a9db1ad708
Create Date: 2020-05-24 01:08:43.985390

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd7200c24b55c'
down_revision = '39a9db1ad708'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('reading', sa.Column('ppm', sa.Float(), nullable=True))
    op.add_column('reading', sa.Column('rgain', sa.Integer(), nullable=True))
    op.add_column('reading', sa.Column('temperature', sa.Float(), nullable=True))
    op.add_column('reading', sa.Column('vgas', sa.Float(), nullable=True))
    op.add_column('reading', sa.Column('vgas0', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('reading', 'vgas0')
    op.drop_column('reading', 'vgas')
    op.drop_column('reading', 'temperature')
    op.drop_column('reading', 'rgain')
    op.drop_column('reading', 'ppm')
    # ### end Alembic commands ###